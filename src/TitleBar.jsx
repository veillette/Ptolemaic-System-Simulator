import React from 'react';


export default class TitleBar extends React.Component {
    constructor(props) {
        super(props);
        this.onResetClick = this.onResetClick.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand navbar-light bg-dark justify-content-between">
                    <span className="navbar-brand mb-0 text-light h1">Ptolemaic System Simulator</span>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button type="button" className="btn btn-link text-light" onClick={this.onResetClick}>Reset</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-link text-light" data-bs-toggle="modal" data-bs-target="#helpModal">Help</button>
                        </li>
                        <li className="nav-item">
                            <button type="button" className="btn btn-link text-light" data-bs-toggle="modal" data-bs-target="#aboutModal">About</button>
                        </li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }

    onResetClick(event) {
        event.preventDefault();
        this.props.onResetClick();
    }
}