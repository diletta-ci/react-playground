import React from 'react';
import '../style/GitHubCards.css';

const CardList = (props) => (
    <div className="github-card-container">
        {props.profiles.map((profile, index) => <Card key={index} {...profile} />)}
    </div>
);

class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div className="github-card">
                <img src={profile.avatar_url} />
                <div className="info">
                    <h3 className="name">{profile.name}</h3>
                    <p className="company">{profile.company}</p>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    constructor() {
        super();

        this.state = { userName: '' };

        this.handleSubmit = (event) => {
            event.preventDefault();

            fetch(`http://api.github.com/users/${this.state.userName}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.props.onSubmit(data);
                    this.setState({ userName: '' });
                });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value })}
                    placeholder="GitHub username"
                    required
                />
                <button>Add card</button>
            </form>
        );
    }
}

class GitHubCardsApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profiles: [],
        };

        this.addNewProfile = (profileData) => {
            this.setState(prevState => ({
                profiles: [...prevState.profiles, profileData],
            }));
        }
    }

    render() {
        return (
            <div>
                <h2 className="header">{this.props.title}</h2>
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} />
            </div>
        );
    }
}

class GitHubCards extends React.Component {
    render() {
        return <GitHubCardsApp title="GitHub Cards App" />
    }
 }

export default GitHubCards;
