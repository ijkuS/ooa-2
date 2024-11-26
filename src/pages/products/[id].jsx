import useUserSession from '@/hooks/use-user-session';
import useCart from '@/hooks/useCart';
// import { addOrUpdateCart } from '@/libs/firebase/cart-related';
import { getProducts } from '@/libs/firebase/product-related';
import { useState } from 'react';

export async function getServerSideProps(context) {
	const { id } = context.params; // Retrieve the ID from the URL
	const products = await getProducts();
	const product = products.find((product) => product.id === id);

	if (!product) {
		return {
			notFound: true, // Show 404 page if the product isn't found
		};
	}

	return {
		props: { product }, // Pass product data to the component as props
	};
}

export default function ProductDetail({ product }) {
	const { user } = useUserSession();
	const { addOrUpdateCartMutation, cartItems } = useCart();
	const { images, title, price, category, id, options, description } =
		product;

	const [selected, setSelected] = useState();
	const [success, setSuccess] = useState(false);
	const handleSelect = (e) => {
		const value = e.target.value;
		setSelected((prevSelected) =>
			prevSelected === value ? null : value
		);
	};
	const handleAddtoBag = async (e) => {
		e.preventDefault();
		console.log('Add to bag');
		if (!selected || selected.length === 0) {
			alert('You did not select any option');
			return;
		}

		const product = {
			id,
			images,
			title,
			category,
			price,
			options: selected || options[0], // Default to first option if none selected
			quantity: 1,
		};

		try {
			addOrUpdateCartMutation.mutate(
				{
					userId: user.uid,
					product,
					// cartItems,
				},
				{
					onSuccess: () => {
						console.log('handleAddtoBag is working well');
						console.log(cartItems);
						setSuccess(true);
						setTimeout(() => setSuccess(null), 3000);
					},
				}
			);
		} catch (error) {
			console.error('Error on addOrUpdatedCartMutation', error);
		}
	};
	return (
		<section className='product-detail__page-container'>
			<div className='sub-wrapper'>
				<div className='preview-image__holder'>
					{images && images.length > 0 ? (
						images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`${title}-${index + 1}`}
							/>
						))
					) : (
						<p>No images availble</p>
					)}
				</div>
				<div className='text__holder'>
					<h2 className='product-title'>{title}</h2>
					<p className='category'>{category}</p>
					<p className='price'>{price} USD</p>
					<div className='options'>
						<p className='sub-title'>Selected Size</p>
						{/* <button className='sub-title'>Size Guide</button> */}

						<div className='option-buttons'>
							{options &&
								options.map((option, index) => (
									<button
										key={index}
										onClick={handleSelect}
										className={
											selected === option
												? 'selected'
												: ''
										}
										value={option}>
										{option}
									</button>
								))}
						</div>
					</div>
					<p className='description'>{description} </p>
					{success && (
						<p className='alert success'>
							The item has been succesfully added to your
							shopping cart
						</p>
					)}
					<div className='buttons'>
						<button
							className='add-bag'
							onClick={handleAddtoBag}>
							Add to Bag
						</button>
						<button className='checkout'>Checkout</button>
					</div>
				</div>
			</div>
		</section>
	);
}
