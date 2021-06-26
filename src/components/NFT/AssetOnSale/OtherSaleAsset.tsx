export const OtherSaleAsset = () => {
  return (
    <>
      <div className="bg-dark vh-100 d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center">
          <div className="card p-2">
            <div className="p-info px-3 py-3">
              <div>
                <h5 className="mb-0">Beats By Dre</h5>{" "}
                <span>Professional Headphones</span>
              </div>
              <div className="p-price d-flex flex-row">
                {" "}
                <span>$</span>
                <h1>299</h1>
              </div>
              <div className="heart">
                {" "}
                <i className="bx bx-heart"></i>{" "}
              </div>
            </div>
            <div className="text-center p-image">
              {" "}
              <img src="https://i.imgur.com/hpftqCo.png" />{" "}
            </div>
            <div className="p-about">
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed
              </p>
            </div>
            <div className="buttons d-flex flex-row gap-3 px-3">
              {" "}
              <button className="btn btn-danger w-100">View</button>{" "}
              <button className="btn btn-outline-danger w-100">Buy Now</button>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
