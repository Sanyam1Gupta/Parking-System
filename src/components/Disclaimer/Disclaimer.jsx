import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import './disclaimer.scss';
import '../../pages/Home/home.scss';

const Disclaimer = props => {
  const { disclaimerData = [] } = props;
  if (disclaimerData.length === 0) return null;

  return (
    <div className="accordian-container">
      <div className="accordian-content">
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="disclaimer-heading">Disclaimer</div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {disclaimerData.map(disclaimer => (
                <li key={disclaimer}>{disclaimer}</li>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Disclaimer;
