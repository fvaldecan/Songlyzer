import time
class SidebarTests:
    def __init__(self,Driver):
        self.Driver = Driver

    def addSong(self) -> None:
        time.sleep(2)
        add = self.Driver.find_element_by_class_name('add-song-button')
        add.click()

    def removeSong(self):
        time.sleep(2)
        remove = self.Driver.find_element_by_class_name('remove-song-button')
        remove.click()

    def clickSong(self):
        time.sleep(2)
        song_selected = self.Driver.find_element_by_class_name('song-button-disc')
        song_selected.click()