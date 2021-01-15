import React, { useState, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { hideAppendModal } from '../../actions/modalActions';
import { appendNewColor } from '../../actions/colorActions';

const AppendModal = () => {
	const dispatch = useDispatch();
	const appendNewColorState = useSelector((state) => state.appendNewColorState);
	const { newColor } = appendNewColorState;

	const [colorName, setColorName] = useState('');
	const [rgb, setRgb] = useState(null);

	useEffect(() => {
		if (newColor) {
			dispatch(hideAppendModal());
			setColorName('');
			setRgb(null);
		}
	}, [dispatch, newColor]);

	const onSubmit = () => {
		const newColor = {
			colorName,
			rgb: document.body.style.backgroundColor,
		};

		console.log(newColor);

		dispatch(appendNewColor(newColor));
	};

	return (
		<div
			id='backdrop'
			onMouseDown={(e) => {
				e.target === document.querySelector('#backdrop') &&
					dispatch(hideAppendModal());
			}}>
			<div className='append-modal modal'>
				<p className='modal__description'>Name your new color button:</p>
				<input
					name='colorName'
					value={colorName}
					onChange={(e) => setColorName(e.target.value)}
					className='append-modal__input input-field'
					type='text'
					maxLength='16'
					placeholder='Enter name...'
					autoFocus
				/>
				<br />
				<div
					className='cancel-btn modal-btn'
					onClick={() => dispatch(hideAppendModal())}>
					Cancel
				</div>
				<div className='add-btn modal-btn' onClick={onSubmit}>
					Add!
				</div>
			</div>
		</div>
	);
};

export default connect(null, { appendNewColor })(AppendModal);
