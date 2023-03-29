import httpClient from 'react-http-client';
import { useState } from "react";



import "./AddTable.css";

const AddTable = () => 
{
    const [tableName, setTableName] = useState("");
    const restaurantId = "7"

    const PostTable = async (event) => {
        event.preventDefault();
        let url = 'http://localhost:8080/restaurants/tables';
        const postResponse = await httpClient.post(
        url , {name: tableName, restaurantId: restaurantId}
        );
        if(postResponse.name === tableName) {
            console.log("Table added successfully.")
        }
        else {
            console.log("Table addition failed!")
        }

    }

    return (
        <div className="add-table">
            <div className="table-form-container">
                <div className="table-form">
                    <div className="form">
                        <form>
                            <div className="input-container">
                                <label>Masa Adı</label>
                                <input type="text" name="tableNameField" onChange={(input) => setTableName(input.target.value)} required/>
                            </div>               
                            <div className="button-container">
                                <input onClick={PostTable} type="submit" value="Ekle" />
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTable;