import time

class War:
    def __init___(self, war_type, pop_affected, side_one, side_two):
        self.destructiveness = war_type.bloodiness * pop_affected
        self.casulties = 0
        self.round = 1
        self.resolved = False
        self.side_one = side_one
        self.side_two = side_two
        
        
    def run(self):
        while(not self.resolved):
            if self.casulties > 1000000 and self.UN_cares(self.side_one, self.side_two):
                time.sleep(999999999)
                
            
            if self.side_one.GDP / self.side_two.GDP > 2 and round > 4:
                self.casulties += 20000
                self.resolved = True
                self.side_two.economy -= self.destructiveness * 100
            
            if self.side_two.GDP / self.side_two.GDP > 2 and round > 4:
                self.casulties += 20000
                self.resolved = True
                self.side_one.economy -= self.destructiveness * 100
            
            
            self.side_two.GDP -= self.destructiveness * 100
            self.side_one.GDP -= self.destructiveness * 100
            self.casulties += 20000
            self.round += 1
    
    def UN_cares(self):
        return self.side_one.hasNaturalResources() or self.side_two.hasNaturalResources() or self.side_one.western or self.side_two.Western
