import { Grid, MenuItem, Pagination, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Book from "../../components/books/Book";
import { GetAllBooksApi } from "../../services/DataService";
import './Home.css';

function Home(props) {
    const sortingWays = [
        {value: 'latest', name: 'Sort by latest'}, 
        {value: 'oldest', name: 'Sort by oldest'}, 
        {value: 'price-l-h', name: 'Sort by price low-high'},
        {value: 'price-h-l', name: 'Sort by price hign-low'}         
    ];

    const [state, setState] = useState({
        books: [],
        pageNumber: 1,
        pageLimit: 12,
        startBookIndex: 0,
        sort: sortingWays[0].value
    });

    useEffect(
        () => {
            GetAllBooksApi()
            .then(response => {
                if(response.status == 200){
                    setState(prevState => ({...prevState, books: response.data.data}))
                }
            })
            .catch(error => {
                console.log(error);
            });
        },
        []
    );

    useEffect(
        () => {
            setState(prevState => ({
                ...prevState,
                pageNumber: 1,
                startBookIndex: 0,
            }));
        },
        [props.search, state.sort]
    )

    const pageChangeHandler = (e, pageNumber) => {
        setState(prevState => ({
            ...prevState,
            pageNumber,
            startBookIndex: parseInt((pageNumber - 1) * state.pageLimit)
        }));
    };

    const sortChangeHandler = (e) => {
        setState(prevState => ({
            ...prevState,
            sort: e.target.value
        }));
    }

    const booksSearchMethod = (book) => {
        const search = props.search.toLowerCase()
        return book.bookName.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);
    };

    const booksSliceMethod = () => [state.startBookIndex, state.startBookIndex + state.pageLimit];

    const booksMapMethod = (book) => (
        <Grid item>
            <Book 
                key={book._id}
                data={book}
            />
        </Grid>
    );

    const booksSortMethod = (book1, book2) => {
        switch (state.sort) {
            case sortingWays[0].value:
                return book1.createdAt < book2.createdAt ? 1 : -1;
            case sortingWays[1].value:
                return book1.createdAt < book2.createdAt ? -1 : 1;
            case sortingWays[2].value:
                return book1.price < book2.price ? -1 : 1;
            case sortingWays[3].value:
                return book1.price < book2.price ? 1 : -1;
            default:
                return 0;
        }
    }

    return (
        <div className="dashboard-home">
            <div className="dashboard-home-query-meta-data">
                <div className="dashboard-home-query-meta-data-item-count">
                    <div className="dashboard-home-query-meta-data-item-name">
                        Books
                    </div>
                    <div className="dashboard-home-query-meta-data-count-number">
                        ({state.books.length})
                    </div>
                </div>
                <div className="dashboard-home-query-meta-data-sort-by">
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.sort}
                        size="small"
                        onChange={sortChangeHandler}
                    >
                        {
                            sortingWays.map(sortData => (
                                <MenuItem value={sortData.value}>{sortData.name}</MenuItem>        
                            ))
                        }
                    </Select>
                </div>
            </div>
            <Grid container spacing={2}>
                {
                    props.search == '' ? 
                        state.books.sort(booksSortMethod).slice(...booksSliceMethod()).map(booksMapMethod)
                    : 
                        state.books.filter(booksSearchMethod).sort(booksSortMethod).slice(...booksSliceMethod()).map(booksMapMethod)
                }
            </Grid>
            <Pagination shape="rounded"
                count={parseInt(state.books.length / state.pageLimit + 1)} 
                onChange={(e, pageNumber) => pageChangeHandler(e, pageNumber)}
                page={state.pageNumber}
            />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        search: state.DashboardReducer.search
    }
}

export default connect(mapStateToProps) (Home);