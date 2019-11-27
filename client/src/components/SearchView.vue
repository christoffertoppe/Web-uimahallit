<template>
    <div id="mainContainer">
        <h1>Uimahallit</h1>
        <form>
            <fieldset>
                <label>Haku: <input type="text" name="poolSearch"></label>
                <input type="submit" name="searchButton" value="Hae">
            </fieldset>
            <fieldset id="citySet">
                <label>Vantaa <input type="checkbox" name="city" value="Vantaa"></label>
                <label>Helsinki <input type="checkbox" name="city" value="Helsinki"></label>
                <label>Espoo <input type="checkbox" name="city" value="Espoo"></label>
                <label>Kauniainen <input type="checkbox" name="city" value="Kauniainen"></label>
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
    margin-left: 10px;
    margin-right: 10px;
}
</style>