import time

class SelectMenuTests:
    def __init__(self, Driver):
        self.Driver = Driver

    
    def searchSong(self, search_input) -> None:
        time.sleep(2)
        searchMusic = self.Driver.find_element_by_id('search-music')
        searchMusic.send_keys(search_input)
        time.sleep(2)
        searchButton = self.Driver.find_element_by_class_name('search-button')
        searchButton.click()

    def addSongToLists(self) -> None:
        time.sleep(2)
        addSongOne = self.Driver.find_element_by_class_name('add-track-button')
        addSongOne.click()
        time.sleep(2)
        addSongTwo = self.Driver.find_element_by_class_name('add-track-button')
        addSongTwo.click()
        
    def addSelectedSongs(self) -> None:
        time.sleep(2)
        add = self.Driver.find_element_by_class_name('add-selected-tracks')
        add.click()
    def removeSelectedSong(self) -> None:
        time.sleep(2)
        remove = self.Driver.find_element_by_class_name('remove-song-button')
        remove.click()
    def exitSelectMenu(self) -> None:
        time.sleep(2)
        exitButton = self.Driver.find_element_by_class_name('_modal-close-icon')
        exitButton.click()