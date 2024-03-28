/* import './Test.css' */
import Button from './Components/Button.jsx'

function Test() {

    const buttons = [
        {"background": 'red', "text": "Home"},
        {"background": 'blue', "text": "Cart"}
    ];

  return (
    <>
      <nav>
        <button style={{'background': 'red'}}>Home</button>
        <button style={{'background': 'blue'}}>Cart</button>
        <Button background={'red'} text={'Home'}/>
        <Button background={'blue'} text={'Cart'}/>
        {/* forEach doesn't work because we need to return something */}
        {/* {
            buttons.forEach((el, idx) => <Button key={idx} background={el.background} text={el.text}/>)
        } */}
        {
            buttons.map((el, idx) => <Button key={idx} background={el.background} text={el.text}/>)
        }
        {
            buttons.map((el, idx) => <Button key={idx} {...el}/>)
        }
      </nav>
    </>
  )
}

export default Test
