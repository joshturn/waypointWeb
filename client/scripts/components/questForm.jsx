var React = require('react');
var tform = require('tcomb-form');

var FormView = tform.form.Form;

var Quest = tform.struct({
	title: tform.Str,
	length: tform.Str,
	description: tform.Str,
	estimatedTime: tform.Str
});

class QuestForm extends React.Component {

  constructor(props) {
    super(props);
		this.state = {
			quest: {
				title: props.quest.title,
				description: props.quest.description,
				length: props.quest.length,
				estimatedTime: props.quest.estimated_time,
			}
		};
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps: ', nextProps);
    this.setState({
      quest: {
        title: nextProps.quest.title,
        description: nextProps.quest.description,
        length: nextProps.quest.length,
        estimatedTime: nextProps.quest.estimated_time,
      }
    });
  }


  save() {

  	var value = this.refs.questForm.getValue();

  	if (value) {
      var newQuest = {
        title: value.title,
        length: value.length,
        description: value.description,
        estimated_time: value.estimatedTime,
        creator_facebook_id: this.props.userId,
				id: this.props.quest.id
      };
			this.props.updateQuest(newQuest);
  	}

  }

  destroy() {
    this.props.deleteQuest();
  }

  render() {
    return (
    	<div className="ui inverted red segment">
        <form className="ui inverted form">
	    	<FormView
	    	  ref="questForm"
	    	  type={Quest}
	        value={this.state.quest}/>
        </form>
        <button className="ui black button" onClick={this.save.bind(this)} style={styles.button}>Save</button>
        <button className="ui black button" onClick={this.destroy.bind(this)} style={styles.button}>Delete</button>
    	</div>
  	);
  }

}

var styles = {
  button: {
    margin: 5
  }
}

module.exports = QuestForm;
