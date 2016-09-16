# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANT_API = "2"

Vagrant.configure(VAGRANT_API) do |config|

  # Use debian as our box
  config.vm.box = "ubuntu/trusty64"

  # run this script at initial setup
  config.vm.provision :shell, :path => "devinfo/provision.sh"

  config.vm.provider "virtualbox" do |v|
     v.name = "car-data-dashboard"
     v.memory = 2048
     v.cpus = 2
  end

  # PostgreSQL
  config.vm.network :forwarded_port, host: 5455, guest: 5432

end
