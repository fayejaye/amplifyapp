import React from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";

export interface GraphQLResult {
  data?: Record<string, any>;
  errors?: [object];
  extensions?: {
    [key: string]: any;
  };
}

const ShowItems = () => {
  const [list, setList] = React.useState<GraphQLResult>();

  React.useEffect(() => {
    const fetch = async () => {
      try {
        let result = await API.graphql(graphqlOperation(listTodos));
        setList({ data: result });
      } catch (e) {
        alert(e);
      }
    };
    fetch();
  }, [list]);

  if (list) {
    const toDoList = list.data?.data.listTodos;
    return (
      <div>
        <ul style={{ listStyleType: "none" }}>
          {toDoList.items.map((item: { name: string }, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ShowItems;
