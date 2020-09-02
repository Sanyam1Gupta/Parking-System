import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import './faq.scss';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: theme.typography.pxToRem(16),
    flexBasis: '100%',
    color: '#FF0062',
    flexShrink: 0,
    fontWeight: 'normal',
    fontFamily: 'Lato',
  },
  expansionPanelSummaryRoot: {
    padding: '16px',
    overflow: 'hidden',
  },
  expansionPanelSummaryExpanded: {
    position: 'sticky',
    zIndex: 8,
    backgroundColor: 'white',
    left: 0,
    top: '-50px',
    boxSizing: 'border-box',
    borderRadius: '16px 16px 0px 0px',
  },
  expansionPanelSummaryContent: {
    margin: '0px',
  },
}));

const expansionPanelStyles = makeStyles(() => ({
  root: {
    border: '2px solid #F9F9F9',
    margin: '20px 0',
    borderRadius: '16px 16px 16px 16px',
    backgroundColor: '#fff',
    top: '0',
    '&:before': {
      height: '0px',
    },
  },
}));

const EachFaq = props => {
  const { faqD } = props;
  const { _id = '', question = '', answer = '' } = faqD;
  const isExpanded = false;
  const classes = useStyles();
  const expansionPanelClasses = expansionPanelStyles();
  const [expanded, setExpanded] = React.useState(
    isExpanded ? 'month-expansion-panel' : false,
  );

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div key={_id} className="faq-question-answer-container">
      <Accordion
        elevation={0}
        expanded={expanded === 'month-expansion-panel'}
        onChange={handleChange('month-expansion-panel')}
        className={expansionPanelClasses.root}
      >
        <AccordionSummary
          expandIcon={
            expanded ? (
              <RemoveIcon
                style={{
                  color: '#FF0062',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              />
            ) : (
              <AddIcon
                style={{
                  color: '#FF0062',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              />
            )
          }
          className={classes.expansionPanelSummaryRoot}
          classes={{
            expanded: classes.expansionPanelSummaryExpanded,
            content: classes.expansionPanelSummaryContent,
          }}
        >
          <div className={classes.heading}>{question}</div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="faq-answer-container">{answer}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EachFaq;
