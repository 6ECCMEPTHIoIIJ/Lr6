import { useEffect, useState } from 'react';
import { Container, Button, Tabs, Tab, Badge, Card, ListGroup, Stack, InputGroup, Form, Row, Col } from 'react-bootstrap';
import './App.css';
import StorageImg from './assets/storage1.jpg';
import SupplyImg from './assets/supply1.jpg';
import RequestImg from './assets/request1.jpg';

interface ProductStock {
    product: Product;
    storage: Storage;
    count: number;
}

interface Product {
    name: string;
    imageUrl: string;
    productStocks: ProductStock[];
}

interface Storage {
    address: string;
    productStocks: ProductStock[];
}

interface Supply {
    date: string;
    positionsInSupplies: Position[];
    storage: Storage;
}

interface Position {
    count: number;
    product: Product;
}

interface Request {
    requestDate: string;
    completionDate: string;
    positionsInRequests: Position[];
    storage: Storage;
}

function App() {
    const [tabKey, setTabKey] = useState<string>('storages');
    const [storages, setStorages] = useState<Storage[]>();
    const [products, setProducts] = useState<Product[]>();
    const [supplies, setSupplies] = useState<Supply[]>();
    const [requests, setRequests] = useState<Request[]>();
    const [addSupplies, setAddSupplies] = useState<any[]>([]);

    useEffect(() => {
        populateStoragesData();
        populateProductsData();
        populateSuppliesData();
        populateRequestsData();
    }, []);

    const storagesContents = storages === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <Container className="d-flex align-content-center justify-content-center flex-wrap">
            {storages.map(storage =>
                <Card className="p-2 m-3" style={{ width: "400px" }}>
                    <Card.Title className="p-2">{storage.address}</Card.Title>
                    <Card.Img src={StorageImg} style={{ maxWidth: "300px", alignSelf: "center" }} />
                    <Card.Body>
                        {storage.productStocks.length !== 0
                            ? <ListGroup>
                                {storage.productStocks.map(productStock =>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <div className="p-2">
                                                {productStock.product.name}
                                            </div>
                                            <div className="p-2 ms-auto">
                                                <Badge>
                                                    {productStock.count}
                                                </Badge>
                                            </div>
                                        </Stack>
                                    </ListGroup.Item>)}
                            </ListGroup>
                            : <p><em>Пусто...</em></p>}
                    </Card.Body>
                </Card>)}
        </Container>

    const productsContents = products === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <Container className="d-flex align-content-center justify-content-center flex-wrap">
            {products.map(product =>
                <Card className="p-2 m-3" style={{ width: "400px" }}>
                    <Card.Title className="p-2">{product.name}</Card.Title>
                    <Card.Img src={product.imageUrl} style={{ maxWidth: "300px", alignSelf: "center" }} />
                    <Card.Body>
                        {product.productStocks.length !== 0
                            ? <ListGroup>
                                {product.productStocks.map(productStock =>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <div className="p-2">
                                                {productStock.storage.address}
                                            </div>
                                            <div className="p-2 ms-auto">
                                                <Badge>
                                                    {productStock.count}
                                                </Badge>
                                            </div>
                                        </Stack>
                                    </ListGroup.Item>)}
                            </ListGroup>
                            : <p><em>Нет в наличии...</em></p>}
                    </Card.Body>
                </Card>)}
        </Container>

    const addSupply = <Container className="mt-3 mb-5">
        {addSupplies}
        <Button onClick={() => {
            setAddSupplies([...addSupplies,
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Product Name"
                    aria-label="Product Name"
                />
                <Form.Control type="number"
                    placeholder="Product Count"
                    aria-label="Product Count"
                />
            </InputGroup>
            ]);
        }}>
            Add Position
        </Button>
        <Button className="mе-3">
            Submit
        </Button>
    </Container>

    const suppliesContents = supplies === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <Container className="d-flex align-content-center justify-content-center flex-wrap">
            {supplies.map(supply =>
                <Card className="p-2 m-3" style={{ width: "800px" }}>
                    <Card.Title className="p-2">{supply.date}</Card.Title>
                    <Card.Img src={SupplyImg} style={{ maxWidth: "300px", alignSelf: "center" }} />
                    <Card.Body>
                        {supply.positionsInSupplies.length !== 0
                            ? <ListGroup>
                                {supply.positionsInSupplies.map(position =>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <div className="p-2">
                                                {supply.storage.address}
                                            </div>
                                            <div className="p-2">
                                                {position.product.name}
                                            </div>
                                            <div className="p-2 ms-auto">
                                                <Badge>
                                                    {position.count}
                                                </Badge>
                                            </div>
                                        </Stack>
                                    </ListGroup.Item>)}
                            </ListGroup>
                            : <p><em>Пусто...</em></p>}
                    </Card.Body>
                </Card>)}
        </Container>

    const requestsContents = requests === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <Container className="d-flex align-content-center justify-content-center flex-wrap">
            {requests.map(request =>
                <Card className="p-2 m-3" style={{ width: "800px" }}>
                    <Card.Title className="p-2">{request.requestDate} - {request.completionDate === null ? <Badge bg="danger">Not completed</Badge> : <p>{request.completionDate} <Badge bg="success">Completed</Badge></p>}</Card.Title>
                    <Card.Img src={RequestImg} style={{ maxWidth: "300px", alignSelf: "center" }} />
                    <Card.Body>
                        {request.positionsInRequests.length !== 0
                            ? <ListGroup>
                                {request.positionsInRequests.map(position =>
                                    <ListGroup.Item>
                                        <Stack direction="horizontal" gap={3}>
                                            <div className="p-2">
                                                {request.storage.address}
                                            </div>
                                            <div className="p-2">
                                                {position.product.name}
                                            </div>
                                            <div className="p-2 ms-auto">
                                                <Badge>
                                                    {position.count}
                                                </Badge>
                                            </div>
                                        </Stack>
                                    </ListGroup.Item>)}
                            </ListGroup>
                            : <p><em>Пусто...</em></p>}
                    </Card.Body>
                </Card>)}
        </Container>

    return (
        <Tabs
            activeKey={tabKey}
            onSelect={(k) => setTabKey(k!)}
            fill
        >
            <Tab eventKey="storages" title="Хранилища">
                {storagesContents}
            </Tab>
            <Tab eventKey="products" title="Товары">
                {productsContents}
            </Tab>
            <Tab eventKey="supplies" title="Поставки">
                {suppliesContents}
            </Tab>
            <Tab eventKey="requests" title="Запросы">
                {requestsContents}
            </Tab>
        </Tabs>
    );

    async function populateStoragesData() {
        const response = await fetch('storages');
        const data = await response.json();
        setStorages(data);
    }

    async function populateProductsData() {
        const response = await fetch('products');
        const data = await response.json();
        setProducts(data);
    }

    async function populateSuppliesData() {
        const response = await fetch('supplies');
        const data = await response.json();
        setSupplies(data);
    }

    async function populateRequestsData() {
        const response = await fetch('requests');
        const data = await response.json();
        setRequests(data);
    }
}

export default App;