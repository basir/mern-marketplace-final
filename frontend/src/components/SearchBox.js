import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default function SearchBox(props) {
  const [keyword, setKeyword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/search/${keyword}`);
  };
  return (
    <Form onSubmit={handleSubmit} inline>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search"
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-success">
        Search
      </Button>
    </Form>
  );
}
