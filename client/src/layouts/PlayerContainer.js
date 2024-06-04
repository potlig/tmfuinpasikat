import GameRoom from "components/GameRoom";
import Readying from "components/Readying";
import Scores from "components/Scores";
import Timer from "components/Timer";
import Waiting from "components/Waiting";
import { SocketIO } from "data/constants/constants";
import { useCallback, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { localIP } from "data/constants/constants";
import { useCookies } from "react-cookie";
import background from '../assets/img/red-bg.jpg';
import background2 from '../assets/img/blue-bg.jpg';
import PlayerLogin from "./PlayerLogin";

function PlayerContainer() {
    const [cookies, setCookie, removeCookie] = useCookies(["player_id", "playerName", "roomName"]);
    const [status, setStatus] = useState();
    const [categorySelected, setCategorySelected] = useState();
    const [questionSelected, setQuestionSelected] = useState();
    const [timeStarted, setTimeStarted] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const getRoomName = urlParams.get('roomName');
    
    useEffect(() => {
        setCookie('roomName', getRoomName);
    }, [getRoomName, setCookie]);

    useEffect(() => {
        const handleUpdateStatus = () => {
            console.log('handle status')
            getStatus()
        };
        const handleGameStart = async () => {
            console.log('game-start');
            getStatus();
        };
        const handleTimeLeft = (data) => {
            console.log('time-left event received:', data);
            setTimeStarted(data.timeStarted);
            setMinutes(data.timeRemaining.minutes);
            setSeconds(data.timeRemaining.seconds);
        };

        console.log('Setting up event listeners');
        SocketIO.on('update-status', handleUpdateStatus);
        SocketIO.on('game-start', handleGameStart);
        SocketIO.on('time-left', handleTimeLeft);

        return () => {
            console.log('Cleaning up event listeners');
            SocketIO.off('update-status', handleUpdateStatus);
            SocketIO.off('game-start', handleGameStart);
            SocketIO.off('time-left', handleTimeLeft);
        };
    }, []);

    const getPlayers = async () => {
        const response = await fetch(`${localIP}/playerById?player_id=${cookies.player_id}`);
        const data = await response.json();
        if (data.length > 0 && data[0].player_id) {
            setCookie("player_id", data[0].player_id, { path: '/', maxAge: 400 });
            setCookie("playerName", data[0].name, { path: '/', maxAge: 400 });
        }
    };

    const getStatus = async () => {
        console.log(getRoomName);
        const response = await fetch(`${localIP}/getRoom?roomName=${getRoomName}`);
        const data = await response.json();
        console.log(data);
        setStatus(data[0].status);
        setCookie("roomName", getRoomName, { path: '/', maxAge: 400 });
        if (data[0].status === 'play') {
            console.log('play');
            const categoryResponse = await fetch(`${localIP}/category-selected-full`);
            const categoryResponseJson = await categoryResponse.json();
            setCategorySelected(categoryResponseJson);
            console.log(categoryResponseJson)
            const questionResponse = await fetch(`${localIP}/question-selected-full`);
            const questionResponseJson = await questionResponse.json();
            setQuestionSelected(questionResponseJson);
            console.log(questionResponseJson)
        }
    };

    const wrapperJoin = useCallback((wrapperData) => {
        const roomName = cookies.roomName;
        const playerName = wrapperData;
        const data = { roomName, playerName };
        console.log(data);
        SocketIO.emit('join-room', data);
    }, [cookies.roomName]);

    const wrapperSendReady = useCallback(() => {
        const roomName = cookies.roomName;
        const playerName = cookies.playerName;
        const data = { roomName, playerName };
        SocketIO.emit('ready', data);
    }, [cookies.roomName, cookies.playerName]);

    const Display = () => {
        if (cookies.player_id !== undefined) {
            switch (status) {
                case "waiting":
                    return <Waiting isPlayer={true} />;
                case "readying":
                    return <Readying categorySelected={categorySelected} wrapperSendReady={wrapperSendReady} isPlayer={true} />;
                case "play":
                    return (
                        <GameRoom timeStarted={timeStarted} questionSelected={questionSelected} player_id={cookies.player_id} categorySelected={categorySelected} wrapperSendReady={wrapperSendReady} isDone={false} isPlayer={true} />
                    );
                case "end":
                    return <Scores roomName={cookies.roomName} />;
                default:
                    return (
                        <Container style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>
                            <div>
                                <h1 style={{ textAlign: "center", color: "yellow", fontSize: "40px" }}>Loading...</h1>
                            </div>
                        </Container>
                    );
            }
        } else {
            return <PlayerLogin roomName={cookies.roomName} wrapperJoin={wrapperJoin} />;
        }
    };

    return (
        <Container fluid style={{ backgroundImage: status === "play" ? `url(${background2})` : `url(${background})`, marginLeft: "auto", marginRight: "auto" }}>
              <Row>
				{status === "play"? <Timer  minutes={minutes} seconds={seconds} /> : null}
			</Row>
            <Row >
                {Display()}
            </Row>
            {/* <Row>
                {doneButton ? <Button style={{ width: "20%", height: "6%", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
                    onClick={() => done()}>Done</Button> : null}
            </Row> */}
        </Container>
    );
}

export default PlayerContainer;
