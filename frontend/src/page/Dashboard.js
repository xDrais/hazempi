
 import {BrowserRouter,Routes,Route} from "react-router-dom";
import NavBar from "../Components/Dashboard/NavBar";
import { DashboardHTML } from "../Components/dashboard";
import ReactHtmlParser from 'react-html-parser';


 function Dashboard  () {
    return ( <>
<div>    <div>{ReactHtmlParser(DashboardHTML)}   </div>
</div>;        <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
          <NavBar />
        
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> List Account</h4>
        <div className="card">
       
                <h5 className="card-header">Accounts</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Users</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr>
                        <td><i className="fab fa-angular fa-lg text-danger me-3"></i> <strong>Angular Project</strong></td>
                        <td>Albert Cook</td>
                        <td>
                          <ul className="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Lilian Fuller"
                            >
                              <img src="../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle" />
                            </li>
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Sophia Wilkerson"
                            >
                              <img src="../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle" />
                            </li>
                            <li
                              data-bs-toggle="tooltip"
                              data-popup="tooltip-custom"
                              data-bs-placement="top"
                              className="avatar avatar-xs pull-up"
                              title="Christina Parker"
                            >
                              <img src="../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle" />
                            </li>
                          </ul>
                        </td>
                        <td><span className="badge bg-label-primary me-1">Active</span></td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div className="dropdown-menu">
                              <a className="dropdown-item" href="javascript:void(0);">
                                <i className="bx bx-edit-alt me-1"></i> Edit</a>
                              <a className="dropdown-item" href="javascript:void(0);">
                                <i className="bx bx-trash me-1"></i> Delete</a>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
        </div> </div> </div>

        
</>
     );
}
export default Dashboard

