import { useEffect, useState } from 'react';

import Tab from 'react-bootstrap/esm/Tab';
import Badge from 'react-bootstrap/esm/Badge';
import Row from 'react-bootstrap/esm/Row';
import Nav from 'react-bootstrap/esm/Nav';
import Col from 'react-bootstrap/esm/Col';


import StorageImg from './assets/storage1.jpg';
import EmptyStorageImg from './assets/storage2.jpg';
import SupplyImg from './assets/supply1.jpg';
import RequestImg from './assets/request1.jpg';
import UncompletedRequestImg from './assets/request2.jpg';
import DbElementCard from './DbElement';
import "./DbElement.css";
import './App.css';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

interface ProductStock {
    id: number;
    product: Product;
    storage: Storage;
    count: number;
}

interface Product {
    id: number;
    name: string;
    imageUrl: string;
    productStocks: ProductStock[];
}

interface Storage {
    id: number;
    address: string;
    productStocks: ProductStock[];
}

interface Supply {
    id: number;
    date: string;
    positionsInSupplies: Position[];
    storage: Storage;
}

interface Position {
    id: number;
    count: number;
    product: Product;
}

interface Request {
    id: number;
    requestDate: string;
    completionDate: string;
    positionsInRequests: Position[];
    storage: Storage;
}

function App() {
    const [storages, setStorages] = useState<Storage[]>();
    const [products, setProducts] = useState<Product[]>();
    const [supplies, setSupplies] = useState<Supply[]>();
    const [requests, setRequests] = useState<Request[]>();

    const [newStorageAddress, setNewStorageAddress] = useState<string>("");
    const [newProductName, setNewProductName] = useState<string>("");
    const [storageId, setStorageId] = useState<string>("");
    const [productId, setProductId] = useState<string>("");
    const [productUrlId, setProductUrlId] = useState<string>("");
    const [productUrl, setProductUrl] = useState<string>("");
    const [productCount, setProductCount] = useState<string>("");

    useEffect(() => {
        populateDataAsync('storages', setStorages);
        populateDataAsync('products', setProducts);
        populateDataAsync('requests', setRequests);
        populateDataAsync('supplies', setSupplies);
    }, []);


    const storagesContents = storages === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <div className="d-flex flex-wrap justify-content-center" >
            {storages.map(storage =>
                DbElementCard(
                    storage.id,
                    <>{storage.address} {storage.productStocks.length === 0
                        ? <Badge bg="secondary">Empty</Badge>
                        : <></>}</>,
                    storage.productStocks.length !== 0
                        ? StorageImg
                        : EmptyStorageImg,
                    storage.productStocks.map(ps => [
                        "ID: " + ps.id.toString(), 
                        ps.product.name,
                        ps.count.toString() + " шт."
                    ]),
                    "Пусто..."
                ))}
        </div>

    const productsContents = products === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <div className="d-flex flex-wrap justify-content-center" >
            {products.map(product =>
                DbElementCard(
                    product.id,
                    <>{product.name} {product.productStocks.length !== 0
                        ? <></>
                        : <Badge bg="warning">Anavailable</Badge>}</>,
                    product.imageUrl,
                    product.productStocks.map(ps => [
                        "ID: " + ps.id.toString(), 
                        ps.storage.address,
                        ps.count.toString() + " шт."
                    ]),
                    "Нет в наличии..."
                ))}
        </div>

    const suppliesContents = supplies === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <div className="d-flex flex-wrap justify-content-center" >
            {supplies.map(supply =>
                DbElementCard(
                    supply.id,
                    supply.date + " → " + supply.storage.address,
                    SupplyImg,
                    supply.positionsInSupplies.map(pis => [
                        "ID: " + pis.id.toString(), 
                        pis.product.name,
                        pis.count.toString() + " шт."
                    ]),
                    "Пусто..."
                ))}
        </div>

    const requestsContents = requests === undefined
        ? <p><em>Loading... Please refresh</em></p>
        : <div className="d-flex flex-wrap justify-content-center" >
            {requests.map(request =>
                DbElementCard(
                    request.id,
                    <>{request.requestDate}{request.completionDate !== null
                        ? <> - {request.completionDate} ← {request.storage.address} <Badge bg="success">Completed</Badge></>
                        : <> ← {request.storage.address} <Badge bg="danger">Uncompleted</Badge></>}</>,
                    request.completionDate !== null
                        ? RequestImg
                        : UncompletedRequestImg,
                    request.positionsInRequests.map(pir => [
                        "ID: " + pir.id.toString(), 
                        pir.product.name,
                        pir.count.toString() + " шт."
                    ]),
                    "Пусто..."
                ))}
        </div>



    return (
        <div>
            <Tab.Container defaultActiveKey="storages">
                <Row className="fixed-top top-bar">
                    <Nav className="d-flex justify-content-around border-bottom bg-white">
                        <Nav.Item className="flex-fill">
                            <Nav.Link eventKey="storages">
                                Хранилища
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="flex-fill">
                            <Nav.Link eventKey="products">
                                Товары
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="flex-fill">
                            <Nav.Link eventKey="supplies">
                                Поставки
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="flex-fill">
                            <Nav.Link eventKey="requests">
                                Запросы
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <Row>
                    <Tab.Content>
                        <Tab.Pane eventKey="storages">
                            <Row>
                                <Col className="left-col border-end">
                                    {storagesContents}
                                </Col>
                                <Col className="right-col">
                                    <Row className="border-bottom pb-5">
                                        <Col>
                                            <Form.Control placeholder="Адрес склада" type="input" value={newStorageAddress} onChange={e => setNewStorageAddress(e.target.value)} />
                                        </Col>
                                        <Col>
                                            <Button className="submit-button" onClick={() => {
                                                if (newStorageAddress === "") return;
                                                postDataAsync('storages', { address: newStorageAddress });
                                                setNewStorageAddress("");
                                            }}>Добавить склад</Button>
                                        </Col>
                                    </Row>
                                    <Row className="pt-5">
                                        <Col>
                                            <Form.Control placeholder="ID склада" type="input" value={storageId} onChange={e => setStorageId(e.target.value)} />
                                            <Form.Control placeholder="ID товара" type="input" value={productId} onChange={e => setProductId(e.target.value)} />
                                            <Form.Control placeholder="Кол-во товара" type="input" value={productCount} onChange={e => setProductCount(e.target.value)} />
                                        </Col>
                                        <Col>
                                            <Button className="submit-button" onClick={() => {
                                                if (storageId === "" || productId === "" || productCount === "") return;
                                                postDataAsync('productStocks', { productId: productId, storageId: storageId, count: productCount });
                                                setStorageId("");
                                                setProductId("");
                                                setProductCount("");
                                            }}>Добавить товар на склад</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="products">
                            <Row>
                                <Col className="left-col border-end">
                                    {productsContents}
                                </Col>
                                <Col className="right-col">
                                    <Row className="border-bottom pb-5">
                                        <Col>
                                            <Form.Control placeholder="Название товара" type="input" value={newProductName} onChange={e => setNewProductName(e.target.value)} />
                                        </Col>
                                        <Col>
                                            <Button className="submit-button" onClick={() => {
                                                if (newProductName === "") return;
                                                console.log(newProductName);
                                                postDataAsync('products', { name: newProductName, imageUrl: "" });
                                                setNewProductName("");
                                            }}>Добавить товар</Button>
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom pt-5 pb-5">
                                        <Col>
                                            <Form.Control placeholder="ID товара" type="input" value={productUrlId} onChange={e => setProductUrlId(e.target.value)} />
                                            <Form.Control placeholder="URL изображения" type="input" value={productUrl} onChange={e => setProductUrl(e.target.value)} />
                                        </Col>
                                        <Col>
                                            <Button className="submit-button" onClick={() => {
                                                if (productUrlId === "" || productUrl === "") return;
                                                putDataAsync('products/' + productUrlId, { id: productUrlId, name: "", imageUrl: productUrl });
                                                setProductUrlId("");
                                                setProductUrl("");
                                            }}>Добавить изображение к товару</Button>
                                        </Col>
                                    </Row>
                                    <Row className="pt-5">
                                        <Col>
                                            <Form.Control placeholder="ID склада" type="input" value={storageId} onChange={e => setStorageId(e.target.value)} />
                                            <Form.Control placeholder="ID товара" type="input" value={productId} onChange={e => setProductId(e.target.value)} />
                                            <Form.Control placeholder="Кол-во товара" type="input" value={productCount} onChange={e => setProductCount(e.target.value)} />
                                        </Col>
                                        <Col>
                                            <Button className="submit-button" onClick={() => {
                                                if (storageId === "" || productId === "" || productCount === "") return;
                                                postDataAsync('productStocks', { productId: productId, storageId: storageId, count: productCount });
                                                setStorageId("");
                                                setProductId("");
                                                setProductCount("");
                                            }}>Добавить товар на склад</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="supplies">
                            {suppliesContents}
                        </Tab.Pane>
                        <Tab.Pane eventKey="requests">
                            {requestsContents}
                        </Tab.Pane>
                    </Tab.Content>
                </Row>
            </Tab.Container>
        </div>
    );

    async function populateDataAsync(address: string, setter: CallableFunction) {
        const response = await fetch(address);
        const data = await response.json();
        setter(data);
    }

    async function postDataAsync(address: string, sendData: any) {
        fetch(address, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        });
    }

    async function putDataAsync(address: string, sendData: any) {
        fetch(address, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sendData)
        });
    }
}

export default App;