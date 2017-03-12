import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {ErrorMessages} from "@constants/";
import Error from "@components/general/Error";
import Loading from "@components/general/Loading";
import LinkView from "./LinkView";

const mapStateToProps = (state) => {
  return {links: state.links};
};

const mapDispatchToProps = {};

class LinkContainer extends Component {
  static componentName = 'LinkContainer';

  constructor() {
    super();

    this.state = {
      loading: false,
      loadingMore: false,
      canLoadMoreContent: false,
      links: [],
      dataUrl: 'http://192.168.31.189:8000/api/link/',
      error: null
    };
  }

  componentDidMount = () => {
    this.fetchLinkData();
  };

  fetchLinkData = () => {
    this.setState({
      loading: true,
      canLoadMoreContent: false
    });

    if (!this.state.dataUrl) {
      return;
    }

    fetch(this.state.dataUrl, {
      method: 'get',
      dataType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        let links = this.state.links.concat(responseData.results);
        this.setState({
          loading: false,
          links: links,
        });

        if (!responseData.next) {
          this.setState({
            dataUrl: responseData.next,
            canLoadMoreContent: true
          })
        }
      }).catch((err) => {
        this.setState({
          links: [],
          error,
          loadingMore: false,
          canLoadMoreContent: false,
          loading: false,
        });
    });
  };

  _loadMoreContentAsync = async() => {
    this.fetchData();
  };

  render = () => {
    const {loading, error, links, canLoadMoreContent} = this.state;

    if (loading) return <Loading />;
    if (error) return <Error text={error}/>;

    return (
      <LinkView
        links={links}
        canLoadMoreContent={canLoadMoreContent}
        onLoadMoreAsync={this._loadMoreContentAsync}
        reFetch={this.fetchLinkData}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
