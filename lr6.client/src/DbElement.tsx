import Card from "react-bootstrap/esm/Card";
import ListGroup from "react-bootstrap/esm/ListGroup";
import "./DbElement.css";

function DbElementCard(id: number,
    title: any = null,
    imgPath: string | null = null,
    data: any[][] = [],
    onEmptyMsg: string | null = null
) {
    return <Card className="p-3 m-3 elem-card">
        {title === null
            ? <></>
            : <Card.Title>{title}</Card.Title>}
        {imgPath === null
            ? <></>
            : <Card.Img src={imgPath} className="mt-3 w-75 align-self-center" />}
        <Card.Body>
            <p className="p-2">ID: {id}</p>
            {data.length === 0
                ? onEmptyMsg === null
                    ? <></>
                    : <p> {onEmptyMsg}</p>
                : <ListGroup>
                    {data.map(element =>
                        <ListGroup.Item>
                            <div className="d-flex justify-content-between">
                                {element.map(part =>
                                    <div className="m-2">
                                        {part}
                                    </div>)}
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>}
        </Card.Body>
    </Card>
}

export default DbElementCard;