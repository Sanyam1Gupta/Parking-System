import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EachFaq from './EachFaq';

import './faq.scss';
import '../../pages/Home/home.scss';

const Faq = props => {
  const { faqData = [] } = props;
  const isExpanded = false;
  const [expanded, setExpanded] = React.useState(
    isExpanded ? 'month-expansion-panel' : false,
  );

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  if (faqData.length === 0) return null;

  return (
    <div className="accordian-container">
      <div className="accordian-content">
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className="faq-heading">FAQs</div>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              {faqData.map(faqD => {
                const { _id = '', question = '', answer = '' } = faqD;
                return (
                  <div key={_id} className="faq-question-answer-container">
                    <EachFaq faqD={faqD} />
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
