/* eslint-disable */
import { useState, React, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Search({}) {
  return (
    <>
      <InputGroup>
        <Form.Control type="text" placeholder="search for title or author" />
        <Button variant="dark" id="button-addon2">
          Search
        </Button>
      </InputGroup>
    </>
  );
}

export default Search;
