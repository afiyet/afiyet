import httpClient from 'react-http-client';

import "./AddTable.css";

const AddTable = () => 
{
    const  PostTable = async () => { 
        let url = 'https://v2.jokeapi.dev/joke/Any?safe-mode'; //TODO local backend
        const postResponse = await httpClient.Post(
        url , {restaurantId:1,name:"test"}
      );

      console.log(postResponse.status);

    }

    return (
        <div className="add-table">
            <div className="table-form">
                <div className="form">
                    <form>
                        <div className="input-container">
                            <label>Masa Adı:</label>
                            <input type="text" name="uname" required />
                        </div>               
                        <div className="button-container">
                            <input onClick={PostTable} type="submit" value="postTable" />
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddTable;