from selenium import webdriver
from sidebarTests import SidebarTests
from dashboardTests import DashboardTests
from selectMenuTests import SelectMenuTests
import time

PATH = "./chromedriver"
driver = webdriver.Chrome(PATH)
driver.get('http://localhost:3000/')
def addSongs():
    SideBar = SidebarTests(driver)
    SelectMenu = SelectMenuTests(driver)
    SideBar.addSong()
    SelectMenu.searchSong('Childish Gambino')
    SelectMenu.addSongToLists()
    SelectMenu.addSelectedSongs()

addSongs()
time.sleep(10)
driver.quit()
