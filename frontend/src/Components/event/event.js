import "./event.css";
import miel from"./miel.png"
function Event(){
    return(
    <div className="grid">
    <div className="card">
      <div className="card__image">
        <img src={miel} alt="">
</img>
        <div className="card__overlay card__overlay--blue">
          <div className="card__overlay-content">
            <ul className="card__meta">
              <li><a href="#0"><i className="fa fa-tag"></i> Education</a></li>
              <li><a href="#0"><i className="fa fa-clock-o"></i> 22 nov</a></li>
            </ul>

            <a href="#0" className="card__title">LEARN BEE KEEPING</a>

            <ul className="card__meta card__meta--last">
              <li><a href="#0"><i className="fa fa-user"></i> Prof. Samir wafi</a></li>
              <li><a href="#0"><i className="fa fa-facebook-square"></i> Share</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</div>)
}
export default Event;