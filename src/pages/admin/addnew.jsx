import { addNewProduct, uploadFiles } from '@/libs/firebase/storage-related';
import React, { useState } from 'react';

export default function AddNewPage() {
	const [files, setFiles] = useState([]);
	const [product, setProduct] = useState({
		title: '',
		price: '',
		category: '',
		description: '',
		options: '',
	});
	const [previewUrls, setPreviewUrls] = useState([]);
	const [isUploading, setIsUploading] = useState(false);
	const [success, setSuccess] = useState(false);

	// const handleChange = (e) => {
	// 	e.preventDefault();
	// 	const { name, value, files: newFiles } = e.target;
	// 	if (name === 'files') {
	// 		const fileArray = Array.from(newFiles);
	// 		setFiles((prevFiles) =>
	// 			[...prevFiles, ...fileArray].slice(0, 10)
	// 		);
	// 		const newUrls = fileArray.map((file) =>
	// 			URL.createObjectURL(file)
	// 		);
	// 		setPreviewUrls((prevUrls) =>
	// 			[...prevUrls, ...newUrls].slice(0, 10)
	// 		);
	// 		return;
	// 	} else {
	// 		setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
	// 	}
	// };

	const handleChange = (e) => {
		e.preventDefault();
		const { name, value, files: newFiles } = e.target;

		if (name === 'files') {
			const fileArray = Array.from(newFiles);
			setFiles((prevFiles) => {
				const validPrevFiles = Array.isArray(prevFiles)
					? prevFiles
					: [];
				return [...validPrevFiles, ...fileArray].slice(0, 10);
			});
			const newUrls = fileArray.map((file) =>
				URL.createObjectURL(file)
			);
			setPreviewUrls((prevUrls) => {
				const validPrevUrls = Array.isArray(prevUrls)
					? prevUrls
					: [];
				return [...validPrevUrls, ...newUrls].slice(0, 10);
			});
			return;
		} else {
			setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsUploading(true);
		try {
			const urls = await uploadFiles(files);
			addNewProduct(product, urls);
			setProduct((prevProduct) => ({
				...prevProduct,
				imageUrls: [...(prevProduct.imageUrls || []), ...urls],
			}));
			// console.log(urls);
			// console.log(product);
			setSuccess(true);
		} catch (error) {
			console.error('Error on handleSubmit', error);
			setSuccess(false);
		} finally {
			setIsUploading(false);
			setPreviewUrls([]);
			setFiles([]);
			setProduct({
				title: '',
				price: '',
				category: '',
				description: '',
				options: '',
			});
			setTimeout(() => setSuccess(null), 4000);
		}
	};

	return (
		<section className='add-new-products__page-container'>
			<h2 className='page-title'>admin / Addnew page</h2>

			<div className='sub-wrapper'>
				<div className='preview-image__holder'>
					{previewUrls &&
						previewUrls.map((url, index) => (
							<img
								src={url}
								key={index}
								alt={`preview-${index}`}
							/>
						))}
				</div>

				<form className='form__holder' onSubmit={handleSubmit}>
					<label htmlFor='file-input'>Add files</label>
					<input
						type='file'
						accept='image/*'
						name='files'
						id='file-input'
						multiple
						required
						value={product.files}
						onChange={handleChange}
					/>
					<label htmlFor='product-title-input'>
						Product Title
					</label>
					<input
						type='text'
						name='title'
						id='product-title-input'
						placeholder='CREW-NECK MERINO WOOL TOP'
						required
						value={product.title}
						onChange={handleChange}
					/>
					<label htmlFor='category-input'>Category</label>
					<input
						type='text'
						name='category'
						id='category-input'
						placeholder='Women'
						required
						value={product.category}
						onChange={handleChange}
					/>
					<label htmlFor='price-input'>Price (USD)</label>
					<input
						type='number'
						name='price'
						id='price-input'
						placeholder='155'
						required
						value={product.price}
						onChange={handleChange}
					/>
					<label htmlFor='description-input'>Description</label>
					<input
						type='text'
						name='description'
						id='description-input'
						placeholder='Write description about the product'
						required
						value={product.description}
						onChange={handleChange}
					/>
					<label htmlFor='option-input'>Size Options</label>
					<input
						type='text'
						name='options'
						id='size-option-input'
						placeholder='Options(separated by commas)'
						required
						value={product.options}
						onChange={handleChange}
					/>
					<button
						className='button upload'
						type='submit'
						disabled={isUploading}>
						{isUploading ? 'Uploading...' : 'Click to Upload'}
					</button>
					{success && (
						<p className='alert success'>
							Upload Successful!
						</p>
					)}
				</form>
			</div>
		</section>
	);
}
