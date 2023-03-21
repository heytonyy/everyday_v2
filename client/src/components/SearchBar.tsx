export {};

// TODO: make an autocomplete search bar

// const people = [
//   {
//     first: 'Charlie',
//     last: 'Brown',
//     twitter: 'dancounsell'
//   },
//   {
//     first: 'Charlotte',
//     last: 'White',
//     twitter: 'mtnmissy'
//   },
//   {
//     first: 'Chloe',
//     last: 'Jones',
//     twitter: 'ladylexy'
//   },
//   {
//     first: 'Cooper',
//     last: 'King',
//     twitter: 'steveodom'
//   }
// ];

// // https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
// function escapeRegexCharacters(str: string) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function getSuggestions(value: any) {
//   const escapedValue = escapeRegexCharacters(value.trim());

//   if (escapedValue === '') {
//     return [];
//   }

//   const regex = new RegExp('\\b' + escapedValue, 'i');

//   return people.filter(person => regex.test(getSuggestionValue(person)));
// }

// function getSuggestionValue(suggestion: any) {
//   return `${suggestion.first} ${suggestion.last}`;
// }

// function renderSuggestion(suggestion: any, { query }: { query: any }) {
//   const suggestionText = `${suggestion.first} ${suggestion.last}`;
//   // const matches = AutosuggestHighlightMatch(suggestionText, query);
//   // const parts = AutosuggestHighlightParse(suggestionText, matches);

//   return (
//     <span className={'suggestion-content ' + suggestion.twitter}>
//       <span className="name">
//         {
//           parts.map((part, index) => {
//             const className = part.highlight ? 'highlight' : null;

//             return (
//               <span className={className} key={index}>{part.text}</span>
//             );
//           })
//         }
//       </span>
//     </span>
//   );
// }

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       value: '',
//       suggestions: []
//     };
//   }

//   onChange = (event, { newValue, method }) => {
//     this.setState({
//       value: newValue
//     });
//   };

//   onSuggestionsFetchRequested = ({ value }) => {
//     this.setState({
//       suggestions: getSuggestions(value)
//     });
//   };

//   onSuggestionsClearRequested = () => {
//     this.setState({
//       suggestions: []
//     });
//   };

//   render() {
//     const { value, suggestions } = this.state;
//     const inputProps = {
//       placeholder: "Type 'c'",
//       value,
//       onChange: this.onChange
//     };

//     return (
//       <Autosuggest
//         suggestions={suggestions}
//         onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
//         onSuggestionsClearRequested={this.onSuggestionsClearRequested}
//         getSuggestionValue={getSuggestionValue}
//         renderSuggestion={renderSuggestion}
//         inputProps={inputProps} />
//     );
//   }
// }

// ReactDOM.render(<App />, document.getElementById('app'));
