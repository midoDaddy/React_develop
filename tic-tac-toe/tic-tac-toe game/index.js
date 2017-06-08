import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//定义方格组件
class Square extends React.Component {
	render() {
		return (
			<button className="square" onClick={() => this.props.onClick()}>
				{this.props.value}
			</button>
		);
	}
}

//定义方格面板组件
class Board extends React.Component {
	//创建方格组件
	renderSquare(i) {
		return <Square value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}/>
	}
	render() {		
		return (
			<div>				
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

//定义顶层游戏组件
class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			history: [
				{squares: Array(9).fill(null)}
			], //记录方格的历史状态数据
			xIsNext: true,
			stepNumber: 0 //当前步数
		};
	}
	//方格点击事件处理函数
	handleClick(i) {
		const step = this.state.stepNumber;
		const history = this.state.history.slice(0, step + 1); //根据当前步数截取历史数据
		const current = history[step];
		const squares = current.squares.slice(); //复制当前方格数组数据（不要直接修改）
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O'; //修改复制的数组数据
		this.setState({
			history: history.concat([{
				squares: squares
			}]), 
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length
		});
	}
	//跳转至相应的步骤，修改当前步数状态
	jumpTo(step) {
		this.setState({
			xIsNext: step % 2 ? false : true,
			stepNumber: step
		});
	}

	render() {
		const stepNumber = this.state.stepNumber;		
		const history = this.state.history;
        const current = history[stepNumber]; //根据当前步数获取当前的数组数据
        const winner = calculateWinner(current.squares); //计算获胜者
        //生成游戏步数记录
        const moves = history.map((step, move) => {
			const text = move ? 'Move #' + move : 'Game Start';
			return (
				<li key={move} style={move === stepNumber ? {fontWeight: 'bold'} : {fontWeight: 'normal'}}> 
					<a href="#" onClick={() => this.jumpTo(move)}>
						{text}
					</a>
				</li> //列表需要添加key
			)
        });
        //如果有获胜者，显示获胜者，否则显示Next player
		let status;
		if (winner) {
			status = 'Winner: ' + winner;
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<div className="game">
				<div className="game-board">
					<div className="status">{status}</div>
					<Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
				</div>
				<div className="game-info">
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

//获胜者计算函数
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;	
}

