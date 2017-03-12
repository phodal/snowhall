import React, {Component, Linking, PropTypes} from "react";

class LinkCard extends Component {
  static componentName = 'LinkCard';

  static propTypes = {
    link: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      date: PropTypes.string,
      slug: PropTypes.string,
      link: PropTypes.string,
    }).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      link: this.prop.link,
    };
  }

  componentWillReceiveProps(props) {
    if (props.link) {
      const link = props.link;
      this.setState({ link });
    }
  }

  onPress (url){
    Linking.openURL(url);
  }

  render = () => {
    const { link } = this.link;

    return (
      <TouchableOpacity onPress={this.onPress.bind(this, link.link)}>
        <Card>
          <View>
            <Text>{link.title}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default LinkCard;
