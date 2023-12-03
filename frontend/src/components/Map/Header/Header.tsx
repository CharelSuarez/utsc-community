"use client"
import "./Header.css";

interface HeaderProp{
  title: string;
}

export default function Filter({title}: HeaderProp){

    return (
      <div className="header">
        <h1>{title}</h1>
      </div>
      );
}