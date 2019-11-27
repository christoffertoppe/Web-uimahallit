<template>
    <div id="mainContainer">
        <form>
            <fieldset id="searchSet">
                <label><input type="text" name="poolSearch" id="nameSearchField"></label>
                <input type="submit" name="searchByName" value="Hae">
            </fieldset>
        </form>
        <form>
            <fieldset id="citySet">
                <label>Kaikki <input type="radio" name="city" value="all"></label>
                <label>Vantaa <input type="radio" name="city" value="vantaa"></label>
                <label>Helsinki <input type="radio" name="city" value="helsinki"></label>
                <label>Espoo <input type="radio" name="city" value="espoo"></label>
                <label>Kauniainen <input type="radio" name="city" value="kauniainen"></label>
                <label>Kerava <input type="radio" name="city" value="kerava"></label>
            </fieldset>
        </form>
    </div>
</template>

<script>
    export default {
        name: "SearchView"
    }
</script>

<style scoped>
label{
    display: inline;
    margin-left: 10px;
    margin-right: 10px;
}

#nameSearchField{
    max-width: 50%;
    margin:5px auto 5px auto;

}
</style>