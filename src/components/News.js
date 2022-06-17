import React, { useState, useEffect} from "react"
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


export default function News(props) {
 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };


    document.title = `${capitalizeFirstLetter(
       props.category
    )} - NewsMonkey`;
  
  const updateNews = async () => {
    props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading({ loading: true });
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70)
    
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
    props.setProgress(100)
  }

  useEffect(() => {
    updateNews()
  }, [])
  


  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTimeout(()=>{
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setPage(page + 1)
  },250)
  };
   
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
    return (
      <>
        <h1 className="text-center" style={{ margin: "30px", marginTop: "90px" }}>
          NewsMonkey - Top {capitalizeFirstLetter(props.category)} 
          Headlines
        </h1>
        {  loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==   totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
            <div className="row">
              {  articles.map((element) => {
                
                return <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : " "}
                      description={
                        element.description ? element.description : " "
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div> 
              })}
            </div>
          </div>
        </InfiniteScroll>
       
      </>
    )
  
}

News.defaultProps = {
  country: "in",
  pageSize: "8",
  category: "general",
};

News.PropsTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
// handleNextClick = async () => {
  //   console.log("Next");
  //   if (   page + 1 > Math.ceil(   totalResults/ props.pageSize)) {

  //   } else {
  //      setState({
  //   page:    page + 1
  // })
  //  updateNews()
  //   }
  // };

  // handlePrevClick = async () => {
  //    setState({
  //     page:    page - 1,
  //   });
  //  updateNews()
  // };


//  {/* <div className="container d-flex justify-content-between">
//             <button
//               disabled={   page <= 1}
//               type="button"
//               className="btn btn-dark"
//                 onClick={ handlePrevClick}
//             >
//               &larr; Previous
//             </button>
//             <button
//             disabled={   page + 1 > Math.ceil(   totalResults/ props.pageSize)}
//               type="button"
//               className="btn btn-dark"
//                 onClick={handleNextClick}
//             >
//               Next &rarr;
//             </button>
//           </div> */}