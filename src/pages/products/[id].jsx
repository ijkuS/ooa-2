import { getProducts } from '@/libs/firebase/product-related';

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
	const { images, title, price, category, id, options, description, index } =
		product;
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
					<h2>{title}</h2>
					<p>Price: {price} USD</p>
					<p>{description} </p>
					<p>Category: {category}</p>
					<p>Options:{options} </p>
				</div>
			</div>
		</section>
	);
}