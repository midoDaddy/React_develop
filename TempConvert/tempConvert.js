//定义温度名称
const scaleName = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

//华氏温度转为摄氏度
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

//摄氏度转为华氏温度
function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

//输入温度值的转换
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (isNaN(input)) {
    return '';
  }
  const output = Math.round(convert(input) * 1000) / 1000;
  return output.toString();
}

//水是否会沸腾的判断、显示组件
function BoilingVerdict(props) {
	if (props.celsius >= 100) {
		return <p>The water would boil.</p>;
	}
	return <p>The water would not boil.</p>;
}

//温度输入组件
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  //输入值变化时，通过属性触发父级组件事件，并传递参数（输入值与温度类型）
  handleChange(e) {
    this.props.onTempChange(e.target.value, this.props.scale);
  }
  render() {
    return(
      <fieldset>
        <legend>{scaleName[this.props.scale]}</legend>
        <input type="text" onChange={this.handleChange} value={this.props.value}/>
      </fieldset>
    );
  }
}

//父级转换器组件
class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {temperature: '', scale: 'c'};
		this.handleTempChange = this.handleTempChange.bind(this);
	}
  
  //通过子组件变化事件传递来的参数，改变父组件的状态信息
	handleTempChange(temperature, scale) {
    this.setState({temperature, scale}); //ES6对象简写形势，属性名为变量名，属性值为变量值
  }

	render() {
    const temperature = this.state.temperature;
    const scale = this.state.scale;
   // 根据温度与温度模式状态信息，转换出摄氏温度与华氏温度
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		return(
			<fieldset>
				<legend>Enter temperature in {scaleName[scale]}:</legend>
				<TemperatureInput scale="c" value={celsius} onTempChange={this.handleTempChange} />
        <TemperatureInput scale="f" value={fahrenheit} onTempChange={this.handleTempChange} />
				<BoilingVerdict celsius={parseFloat(celsius)} />
			</fieldset>
		);	
	}
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('example')
);


