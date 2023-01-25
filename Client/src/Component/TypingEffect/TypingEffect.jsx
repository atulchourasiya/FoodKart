import Typed from 'react-typed';
import './TypingEffect.css'

const TypingEffect = (props) => {
	return (
		<div className='my-4 typingEffectContainer'>
			<Typed
				className='font-lato fw-bold'
				style={{ fontSize: 'var(--size-500)' }}
				strings={props.text}
				typeSpeed={50}
				backSpeed={50}
				showCursor={true}
				loop={true}
				loopCount={Infinity}
			/>
		</div>
	);
};

export default TypingEffect;
