import React, {useEffect, useState} from 'react';
import "./Shop.css";
import Categories from "../Shop/Categories";



const itemsPerPage = 9;
const Shop = () => {

    const [selectedType, setSelectedType] = useState('vertical');

    const btnClickHandler = (type) => {
        setSelectedType(type);
    };

    // Search
    const [data, setData] = useState(Categories);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [maxPrice, setMaxPrice] = useState(1000);
    const [search, setSearch] = useState('');
    const [productCounts, setProductCounts] = useState({}); // Define productCounts state


    // Calculate product counts for each category
    const calculateProductCounts = () => {
        const counts = {};

        Categories.forEach((product) => {
            const {category} = product;
            counts[category] = counts[category] ? counts[category] + 1 : 1;
        });

        setProductCounts(counts);
    };

    const filterProducts = () => {
        return Categories.filter((product) => {
            const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const isPriceMatch = product.price <= maxPrice;
            const isSearchMatch = product.name.toLowerCase().includes(search.toLowerCase());
            return isCategoryMatch && isPriceMatch && isSearchMatch;
        });
    };

    useEffect(() => {
        calculateProductCounts(); // Calculate product counts when data changes
        const filteredItems = filterProducts();
        setData(filteredItems);
    }, [selectedCategories, maxPrice, search, Categories]);



    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };



    return (
        <>
            <body>
            <div className="shop">
                <div className="container">
                    <div className="content">
                        <ul>
                            <li><a href="">Home</a></li>
                            <i className="bi bi-slash-lg"></i>
                            <li className="active">Shop Left Sidebar</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content-wraper pt-60 pb-60 pt-sm-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 order-1 order-lg-2">
                            <div className="single-banner shop-page-banner">
                                <a href="#">
                                    <img src={process.env.PUBLIC_URL + '/a2.jpg'} alt="Li's Static Banner" width="800"
                                         height="200"/>
                                </a>
                            </div>
                            <div className="shop-top-bar-shop mt-30">
                                <div className="shop-bar-shop">
                                    <div className="product-view-mode">
                                        <ul className="nav shop-item-filter-list" role="tablist">
                                            <li className="multitasking"><a onClick={() => btnClickHandler('vertical')}><i
                                                className="bi bi-grid-3x3-gap-fill"></i></a></li>
                                            <li className="multitasking " role="presentation"><a
                                                onClick={() => btnClickHandler('horizontal')}><i
                                                className="bi bi-grid-1x2"></i></a></li>
                                        </ul>
                                    </div>
                                    <div className="toolbar-amount">
                                        <span>Showing 1 to 9</span>
                                    </div>
                                </div>
                                <div className="product-select-box">
                                    <div className="container-input-shop">
                                        <input
                                            type="text"
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search"
                                            name="text"
                                            className="input"
                                        />
                                        <i className="bi bi-search"></i>
                                    </div>

                                </div>
                            </div>
                            <div className="shop-products-wrapper">
                                <div className="tab-content">
                                    <div id="grid-view" className={selectedType === 'vertical' ? '' : 'hide'}
                                         type={"vertical"}>
                                        <div className="product-area shop-product-area">
                                            <div className="row">
                                                {data.slice(startIndex, endIndex).map((values) => {
                                                    const {id, title, name, price, image} = values;
                                                    return (
                                                        <>
                                                            <div className="col-lg-4 col-md-4 col-sm-6 mt-40" key={id}>
                                                                <div className="product-wrapper mb-45 text-center">
                                                                    <div className="product-img"><a href="#"
                                                                                                    data-abc="true">
                                                                        <img src={image} alt="" width={"270px"} height={"270px"}/>
                                                                    </a>
                                                                        <div className="product-action">
                                                                            <div className="product-action-style">
                                                                                <a className={"add-to-cart"} href=""><i
                                                                                    className="bi bi-cart-plus"></i></a>
                                                                                <a href="#" title="quick view"
                                                                                   className="quick-view-btn"><i
                                                                                    className="bi bi-eye" ></i></a>
                                                                                <a className="links-details"
                                                                                   href=""><i
                                                                                    className="bi bi-heart"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="product_desc">
                                                                    <div className="product_desc_info">

                                                                        <h4><a className="product_name"
                                                                               href="">{name}</a></h4>
                                                                        <div className="price-box">
                                                                                <span
                                                                                    className="new-price">{price}$</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>


                                    <div id="list-view" className={selectedType === 'horizontal' ? '' : 'hide'}
                                         role="tabpanel" type={"horizontal"}>
                                        <div className="row">
                                            <div className="col">
                                                {data.slice(startIndex, endIndex).map((values) => {
                                                    const {id, title, name, price, image} = values;
                                                    return (
                                                        <div className="row product-layout-list" key={id}>
                                                            <div className="col-lg-3 col-md-5 ">
                                                                <div className="product-image">
                                                                    <a href="">
                                                                        <img src={image} alt="Li's Static Banner"/>
                                                                    </a>
                                                                    <span className="sticker">New</span>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-5 col-md-7">
                                                                <div className="product_desc">
                                                                    <div className="product_desc_info">
                                                                        <div className="product-review">
                                                                            <h5 className="manufacturer">
                                                                                <a href="">Graphic Corner</a>
                                                                            </h5>
                                                                            <div className="rating-box">
                                                                                <ul className="rating">
                                                                                    <li><i
                                                                                        className="bi bi-star-fill"></i>
                                                                                    </li>
                                                                                    <li><i
                                                                                        className="bi bi-star-fill"></i>
                                                                                    </li>
                                                                                    <li><i
                                                                                        className="bi bi-star-fill"></i>
                                                                                    </li>
                                                                                    <li><i
                                                                                        className="bi bi-star-half"></i>
                                                                                    </li>
                                                                                    <li className="no-star"><i
                                                                                        className="bi bi-star"></i></li>

                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <h4><a className="product_name"
                                                                               href="">{name}</a></h4>
                                                                        <div className="price-box">
                                                                            <span className="new-price">{price}$</span>
                                                                        </div>
                                                                        <p>{title}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="shop-add-action mb-xs-30">
                                                                    <ul className="add-actions-link">
                                                                        <li className="add-cart active"><a
                                                                            className={"add-to-cart"} href="">Add to
                                                                            cart</a></li>
                                                                        <li><a href="#" title="quick view"
                                                                               className="quick-view-btn"
                                                                               data-toggle="modal"
                                                                               data-target="#exampleModalCenter"><i
                                                                            className="bi bi-eye"></i></a>
                                                                        </li>
                                                                        <li><a className="links-details" href=""><i
                                                                            className="bi bi-heart"></i></a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pagination">
                                        <a href="#" className="Previous"
                                           onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}>
                                            <i className="bi bi-chevron-left"></i> Previous
                                        </a>
                                        {Array.from({length: totalPages}).map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={currentPage === index + 1 ? "active" : ""}
                                            >
                                                {index + 1}
                                            </button>
                                        ))}

                                        <a href="#" className="Next"
                                           onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}>
                                            Next <i className="bi bi-chevron-right"></i>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 order-2 order-lg-1">
                            <div className="sidebar-categores-box">
                                <div className="sidebar-title">
                                    <h2>Filter Product</h2>
                                </div>
                                <div className={"clean"}>
                                    <div className={"range"}>
                                        <p>Price: {maxPrice}$</p>
                                        <div className={"range-slider"}>
                                            <input
                                                type="range"
                                                className="form-range"
                                                min="0"
                                                max="1000"
                                                id="customRange2"
                                                value={maxPrice}
                                                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-sub-area">
                                    <h5 className="filter-sub-titel">Category</h5>
                                    <div className="categori-checkbox">
                                        <form >
                                            <ul className="product-ca">
                                                {Object.keys(productCounts).map((category) => (
                                                    <li key={category}>
                                                        <div className="wper-a-pro">
                                                            <a href="#"
                                                               >{category}</a>
                                                            <div className="div-count">
                                                                <span
                                                                    className="count">({productCounts[category]})</span>
                                                            </div>
                                                        </div>
                                                        <div className="collapse" id={`list-pro-sub-${category}`}>

                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            </body>
        </>
    )
}
export default Shop;
