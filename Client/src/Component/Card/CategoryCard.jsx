import { NavHashLink } from 'react-router-hash-link';
import './CategoryCard.css';
const CategoryCard = (props) => {
	return (
		<NavHashLink
			to='/menu/#menuContainer'
			className='categoryCard'>
			<div className='card bg-dark text-white'>
				<img src={`/images/${props.img}`} className='card-img' alt='' />
				<div className='card-img-overlay'>
					<h5 className='card-title font-lato'>{props.name}</h5>
					<p className='font-script'>VIEW MENU</p>
				</div>
			</div>
		</NavHashLink>
	);
};

export default CategoryCard;
