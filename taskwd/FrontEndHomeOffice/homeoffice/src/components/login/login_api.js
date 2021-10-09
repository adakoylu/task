import axios from 'axios';


export default  function Login_api(props) {
//   const { data, error, loading } = useAxios({


//     url: 'http://127.0.0.1:8000/login/',
//   });
  

  axios.post('http://127.0.0.1:8000/login/',{
    username: props.username,
    password: props.password
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log('errorumuz' + error);
  });

//   data && console.log(data)
  return (

    
    <>
      {/* {loading && <div>Loading...</div>}
      {error && <div>{error.message}</div>} */}
      {/* {data && <div>{data.personal}</div>}
      <div>
          <p>{data && data.map((e)=>
          <p>{e.start_time}</p>)
        }
          </p>
          
      </div> */}
    </>
  );
};