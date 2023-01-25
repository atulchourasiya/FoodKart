import { useDispatch, useSelector } from 'react-redux';
import './Search.css';
import { handleSearch } from './SearchFunc';

const Search = (prosp) => {
	const dispatch = useDispatch();
	const { MenuArray } = useSelector((state) => state.menuState);
	return (
		<div className='d-flex justify-content-center font-lato'>
			<input
				id='searchField'
				list='category'
				name='category'
				className='py-2 ps-4 pe-4 text-light bg-transparent searchbox'
				placeholder={prosp.text}></input>
			<datalist id='category'>
				{MenuArray?.map((item, index) => {
					return <option key={`searchCategory${index}`}>{item.name}</option>;
				})}
			</datalist>
			<button
				onClick={() => {
					handleSearch(MenuArray,dispatch);
				}}
				className='py-2 px-3 text-light searchboxButton'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='20'
					height='20'
					fill='black'
					className='bi bi-search me-2'
					viewBox='0 0 16 16'>
					<path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
				</svg>
			</button>
		</div>
	);
};

export default Search;
