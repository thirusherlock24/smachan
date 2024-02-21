import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import Post from './Post.js';
import ModalPlan from './ModalPlan.js'; // Import the ModalPlan component
import './Feeds.css'; // Import the CSS file
import FeedPost from './FeedPost.js';

function FeedTop({ userName })
{
   
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [plan, setPlan] = useState('');
  const [showModal, setShowModal] = useState(false);

  const planatrip = () => {
    if (plan.toLowerCase() === "plan a trip") {
      return (setShowModal(true)); // Render ModalPlan component if condition is met
    } else {
      alert('type error');
      return null; // or some other fallback
    }}
return(
 
       <div className="form">
    {
        <div className="All-icons">
          <div className="feed-item">
            <input
              type="text"
              placeholder="What's on your mind"
              onClick={() => setIsFormVisible(true)}
            />
          </div>
          <div className="button-group">
            <div className="button-contain">
              <FontAwesomeIcon
                icon={faPlus}
                onMouseEnter={() => setShowText(true)}
                onMouseLeave={() => setShowText(false)}
                style={{ cursor: 'pointer' }}
              />
              {showText && (
                <div className="tooltip">
                  Add Photos and Videos
                </div>
              )}
            </div>
            <div className="button-container">
              <input
                type="text"
                value={plan}
                placeholder="Type: plan a trip"
                onChange={(e) => setPlan(e.target.value)}
              />
              <button className="submit-plan" onClick={planatrip}> {/* onClick should call planatrip function */}
                Submit
              </button>
            </div>
          </div>
        </div>
      }
      <div>      {isFormVisible && <FeedPost isOpen={isFormVisible} onClose={() => setIsFormVisible(false)} userName={userName} />}
</div>
{!isFormVisible && (
          <>
            {<Post userName={userName} />}
          </>
        )}
         <div>
      {<ModalPlan isOpen={showModal} onClose={() => setShowModal(false)} userName={userName} />}
      
    </div>

      </div>
)
}
export default FeedTop;