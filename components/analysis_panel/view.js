import React from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

const toolbarHeight = 112;

const welcomeCard = (
    <div><br/>
    <Card>
        <CardTitle title="Nothing here" />
        <CardText>
            There were no tests yet. Add some analysis to see results here!
        </CardText>
    </Card>
    </div>
);

export default class AnalysisPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        };
    }

    // handleOpen() {
    //     this.setState({open: true});
    // }
    //
    // handleClose() {
    //     this.setState({open: false});
    // }

    render() {
        let {cards} = this.props;

        const admixtureActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={() => this.setState({open: false})}
            />,
            <FlatButton
                label="Run"
                primary={true}
                keyboardFocused={true}
                onTouchTap={() => this.setState({open: false})}
            />,
        ];

        const admixtureModal = (
            <Dialog
                title="ADMIXTURE"
                actions={admixtureActions}
                modal={false}
                open={this.state.open}
                onRequestClose={() => this.setState({open: false})}
            >
                <p>ADMIXTURE is a program for estimating ancestry in a model-based manner from large autosomal SNP genotype datasets, where the individuals are unrelated (for example, the individuals in a case-control association study).</p>
                <TextField
                    floatingLabelText="K"
                    hintText="Number of ancestral populations"
                />
            </Dialog>
        );

        if (!cards.length) {
            cards = cards.push(welcomeCard);
        }

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup>
                        <RaisedButton label="PCA" />
                        <RaisedButton label="ALDER" />
                        <RaisedButton label="ADMIXTURE" onTouchTap={() => this.setState({open: true})}/>
                    </ToolbarGroup>
                </Toolbar>

                <div style={{height: window.innerHeight - toolbarHeight, overflowY: 'scroll'}}>
                    {cards}
                </div>

                {admixtureModal}
            </div>
        )
    }
}
