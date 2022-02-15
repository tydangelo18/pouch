import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import moment from "moment";

const PouchCard = ({ pouch: { name, createdAt, id } }) => {
  const addResource = () => {
    console.log("Adding a resource!");
  };
  return (
    <Card>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/b/be/Kangourou.svg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">{moment(createdAt).fromNow()}</span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={addResource}>
          <Button color="orange" basic></Button>
        </Button>
      </Card.Content>
    </Card>
  );
};

export default PouchCard;
