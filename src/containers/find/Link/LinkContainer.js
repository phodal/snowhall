import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {ErrorMessages} from "@constants/";
import Error from "@components/general/Error";
import Loading from "@components/general/Loading";
import LinkView from "./LinkView";
import {View, Text} from "react-native";

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
      originDataUrl: 'http://192.168.31.189:8000/api/link/',
      dataUrl: 'http://192.168.31.189:8000/api/link/',
      error: null
    };
  }

  componentDidMount = () => {
    this.fetchLinkData();
  };

  fetchLinkData = (option) => {

    if(!option) {
      this.setState({
        loading: true
      });
    } else if (option.dataUrl) {
      this.setState({
        dataUrl: option.dataUrl
      })
    }

    this.setState({
      canLoadMoreContent: false
    });

    if (!this.state.dataUrl) {
      return;
    }

    return fetch(this.state.dataUrl, {
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

        if (!!responseData.next) {
          this.setState({
            dataUrl: responseData.next,
            canLoadMoreContent: true
          })
        }
      }).catch((err) => {
        console.log(err);
        this.setState({
          links: [],
          loadingMore: false,
          canLoadMoreContent: false,
          loading: false,
        });
    });
  };

  _loadMoreContentAsync = async() => {
    this.fetchLinkData({loadingMore: true}).then(() => {
      this.setState({
        loadingMore: true
      })
    })
  };

  render = () => {
    const {loading, error, originDataUrl, links, canLoadMoreContent} = this.state;

    if (loading) return <Loading />;
    if (error) return <Error text={error}/>;

    return (
      <LinkView
        links={links}
        canLoadMoreContent={canLoadMoreContent}
        onLoadMoreAsync={this._loadMoreContentAsync}
        reFetch={this.fetchLinkData}
        dataUrl={originDataUrl}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkContainer);
