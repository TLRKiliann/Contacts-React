const SearchComponent = (props) => {
  
  console.log("props", props);

  return (
    <div className="search--comp">
      <p>{props.content} :&nbsp;</p>
      <p>{props.phone}</p>
    </div>
  );
}

export default SearchComponent;