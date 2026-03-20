import styles from './divider.module.css';

const Divider = ( { text } ) => {
	return (
		<div className={ styles.dividerContainer } >
			<div className={ styles.dividerLine } ></div>
			{ text && <span className={ styles.dividerText } >{ text }</span> }
			<div className={ styles.dividerLine } ></div>
		</div>
	);
};

export { Divider };
