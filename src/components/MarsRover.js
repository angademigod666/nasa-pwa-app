import React from 'react';
import axios from 'axios';

const nasaAPI = {
  nasaAPIRoot: 'https://api.nasa.gov',
  apiName: '/mars-photos/api/v1/rovers',
  roverName: '/curiosity/photos',
  api_key: 'FbUUUOEbgI0tKaKYUzCt0tdeGxuLMY5JOMzUx5Qv',
};


const nasaMarsURL = `${nasaAPI.nasaAPIRoot}${nasaAPI.apiName}${nasaAPI.roverName}?api_key=${nasaAPI.api_key}`;


// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=DEMO_KEY


const localToday = new Date();
let goBack = 0;

class MarsRover extends React.Component {

  state = {
    photos: '',
    date: localToday,
    show: false,
    err: '',
  }

  getMarsRover = () => {
    const today = this.state.date;

    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - goBack}`;

    const dynURL = `${nasaMarsURL}&earth_date=${dateString}&page=1`;
    console.log("GoingTo=>", dynURL);
    this.setState({ photos: '', err: '', date: new Date(dateString), }, () => {
      console.log("After", dynURL);
      axios.get(dynURL)
        .then((res) => {
          //console.log('success', res);
          //this.setState({ photos: res.data.photos, });
          // Getting all photos
          console.log(res);
          //const photos = [res.data.photos[0]];
          const aSinglePhoto = res.data.photos[0]
          console.log(aSinglePhoto);
          if(aSinglePhoto!==undefined) {
            this.setState({ photos:[aSinglePhoto], });
          } else {
            this.setState({err: 'Sorry we are taking time...'},()=>{
              goBack = goBack + 1;
              console.log("GOing Back to", goBack);
              this.getMarsRover();
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ err: err.message });
        });
    });

  }

  componentDidMount = () => {
    console.log("MarsRover Mounted");
    this.getMarsRover();
  }

  handleChange = (e) => {
    const date = new Date(e.target.value);
    // ONly the below code actually works!!!
    // The third way of using setState({},{}=>{});
    if (date < localToday) {
      this.setState({ date, err: '', }, () => this.getMarsRover());
    } else {
      this.setState({ err: 'Future dates are not allowed!' })
    }

  }


  render() {
    console.log("Render");
    
    const { photos, show, err, date, } = this.state;
    // return (
    //   <React.Fragment>
    //     {JSON.stringify(photos)}
    //   </React.Fragment>
    // )
    return (
      <React.Fragment>
        <br />
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <div className="jumbotron">
              <h1 className="display-4">Mars Rover: Curiosity</h1>

              {!photos && (
                <div>
                  <br />
                  <br />
                  <br />
                  <span className="spinner-grow text-muted"></span>
                  <span className="spinner-grow text-success"></span>
                  <span className="spinner-grow text-info"></span>
                  <span className="spinner-grow text-warning"></span>
                  <span className="spinner-grow text-danger"></span>
                  <span className="spinner-grow text-secondary"></span>
                  <span className="spinner-grow text-dark"></span>
                </div>
              )}
              <p className="text-danger">{err}</p>
              {photos && (
                <div>
                  
                  <div className="form-inline">
                    <label htmlFor="date" className="mr-sm-2">
                      {/* {photos.earth_date+88}&nbsp;&nbsp;&nbsp;&nbsp; */}
                      {date.toDateString()}&nbsp;&nbsp;&nbsp;&nbsp;
                      
                      {!show &&
                        <i onClick={() => this.setState(() => ({ show: true }))}>
                          Change date?</i>}
                    </label>
                    {show && (
                      <input type="date" placeholder="Choose a date!" onChange={this.handleChange}
                        className="form-control mb-2 mr-sm-2" id="email" />
                    )}
                  </div>
                  <br/>
                  {photos.map((aPhoto, key) => (
                    <div key={key} className="row">
                      <div className="col-md-6">
                        <img alt={`Images of Martian surface on ${date.toLocaleString()}`} className="img-fluid rounded"
                          src={aPhoto.img_src} />
                      </div>
                      <div className="col-md-6">
                        <h3>{aPhoto.id}</h3>
                        <table className="table table-sm">
                          <thead className="thead-dark">
                            <tr>
                              <th colSpan="2">Camera Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>{aPhoto.camera.name}</th>
                              <td>{aPhoto.camera.full_name}</td>
                            </tr>
                          </tbody>

                          <thead className="thead-dark">
                            <tr>
                              <th colSpan="2">Rover Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>ID</th>
                              <td>{aPhoto.rover.id}</td>
                            </tr>
                            <tr>
                              <th>Name</th>
                              <td>{aPhoto.rover.name}</td>
                            </tr>

                            <tr>
                              <th>Launch</th>
                              <td>{aPhoto.rover.launch_date}</td>
                            </tr>
                            <tr>
                              <th>Landing</th>
                              <td>{aPhoto.rover.landing_date}</td>
                            </tr>
                            <tr>
                              <th>Status</th>
                              <td>{aPhoto.rover.status}</td>
                            </tr>

                            <tr>
                              <th>Max date</th>
                              <td>{aPhoto.rover.max_date}</td>
                            </tr>
                            <tr>
                              <th>Max sol</th>
                              <td>{aPhoto.rover.max_sol}</td>
                            </tr>
                            <tr>
                              <th>Total photos</th>
                              <td>{aPhoto.rover.total_photos}</td>
                            </tr>
                          </tbody>

                          {/* <tr>
                              <th>cameras</th>
                              <td>{JSON.stringify(aPhoto.rover.cameras)}</td>
                            </tr> */}

                        </table>

                      </div>
                    </div>
                  ))}

                </div>
              )}
            </div>
          </div>

        </div>

      </React.Fragment>
    )
  }
}

export default MarsRover;