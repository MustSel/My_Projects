import React from "react";

const List = ({name,image,email,age}) => {
  // const {name,image,email,age} = emply
  
  return (
    <>
      <article className="person">
        <img src={image} alt={name} />
        <div>
          <h4>{name}</h4>
          <p>{email}</p>
          <p>{age} years</p>
        </div>
      </article>
    </>
  );
};

export default List;
