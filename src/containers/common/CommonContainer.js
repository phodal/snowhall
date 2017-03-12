import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {ErrorMessages} from "@constants/";
import Error from "@components/general/Error";
import Loading from "@components/general/Loading";
import CommonView from "./CommonView";
import {View, Text} from "react-native";

const mapStateToProps = (state) => {
  return {data: state.data};
};

const mapDispatchToProps = {};

class CommonContainer extends Component {
  static componentName = 'CommonContainer';

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingMore: false,
      canLoadMoreContent: false,
      data: [],
      originDataUrl: this.props.url,
      dataUrl: this.props.url,
      element: this.props.element,
      error: null
    };
  }

  componentDidMount = () => {
    this.fetchData();
  };

  fetchData = (option) => {

    if(!option) {
      this.setState({
        loading: true
      });
    } else if (option.dataUrl) {
      this.setState({
        data: [],
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
        let data = this.state.data.concat(responseData.results);
        console.log(data);
        this.setState({
          loading: false,
          data: data,
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
          data: [],
          loadingMore: false,
          canLoadMoreContent: false,
          loading: false,
        });
    });
  };

  _loadMoreContentAsync = async() => {
    this.fetchData({loadingMore: true}).then(() => {
      this.setState({
        loadingMore: true
      })
    })
  };

  render = () => {
    const {loading, error, originDataUrl, data, canLoadMoreContent, element} = this.state;

    if (loading) return <Loading />;
    if (error) return <Error text={error}/>;

    return (
      <CommonView
        data={data}
        canLoadMoreContent={canLoadMoreContent}
        onLoadMoreAsync={this._loadMoreContentAsync}
        reFetch={this.fetchData}
        dataUrl={originDataUrl}
        element={element}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonContainer);
