function underscoreToCamel(s){
    return s.replace(/(_\w)/g, function(m){return m[1].toUpperCase();});
}

export default underscoreToCamel;